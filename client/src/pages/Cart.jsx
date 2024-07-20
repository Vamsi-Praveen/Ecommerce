import { validCoupon } from '@/api/API';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useCart from '@/hooks/useCart';
import { useEffect, useState } from 'react';

const Cart = () => {
    const { cartWithProduct: initialCart } = useCart();
    console.log(initialCart)
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState('')
    const [isCouponValid, setIsValidCoupon] = useState(false)
    const [couponAmount, setCouponAmount] = useState(null)

    useEffect(() => {
        if (initialCart) {
            setCart(initialCart);
        }
    }, [initialCart]);

    const handleQuantityChange = async (productId, newQuantity) => {
        const updatedCart = cart?.items.map(item =>
            item.productId === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart({ ...cart, items: updatedCart });
    };

    const calculateSubtotal = (price, quantity) => {
        return Number(price) * Number(quantity);
    };

    const calculateTotalAmount = () => {
        return cart?.items?.reduce((total, item) => {
            return total + calculateSubtotal(item?.productData?.attributes?.price, item?.quantity)
        }, 0);
    }

    const calculateDiscountAmount = () => {
        const totalAmount = calculateTotalAmount()
        return totalAmount - Number(couponAmount)
    }

    const handleCoupon = async () => {
        try {
            const data = await validCoupon(coupon);

            if (data && data.attributes && Date.now() <= new Date(data.attributes.endDate)) {
                setIsValidCoupon(true);
                setCouponAmount(data.attributes.discountValue);
            } else {
                setIsValidCoupon(false);
                setCouponAmount(0);
            }
        } catch (error) {
            console.error("Error validating coupon:", error);
            setIsValidCoupon(false);
            setCouponAmount(0);
        }
    };


    return (
        <div>
            <div className='md:mx-5 mt-4 space-y-2'>
                <span className='font-medium ml-2 text-xl'>Cart</span>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Sub Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart?.items?.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell className="font-medium w-[65%]">
                                    <div className='flex items-center gap-2'>
                                        <img
                                            src={`${import.meta.env.VITE_IMAGE_PATH}${item?.productData?.attributes?.productImages?.data[0]?.attributes?.url}`}
                                            alt="product"
                                            className='h-[50px] w-[50px] object-cover'
                                        />
                                        <span className='line-clamp-1'>{item?.productData?.attributes?.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    ₹{item?.productData?.attributes?.price}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item?.quantity}
                                        onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                                        className="w-2/3 outline-none focus-visible:ring-0"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    ₹{calculateSubtotal(item?.productData?.attributes?.price, item.quantity)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className='py-10 flex justify-between md:flex-row flex-col gap-3 md:gap-0'>
                    <div className='flex gap-2'>
                        <Input type="text" placeholder="Coupon Code" className="focus-visible:ring-0" onChange={(e) => { setCoupon(e.target.value) }} />
                        <Button variant="primary" onClick={handleCoupon} disabled={coupon == ''}>Apply Coupon</Button>
                    </div>
                    <div className='p-2.5 border border-slate-400 rounded-sm md:w-[300px] space-y-2'>
                        <h1 className='font-medium'>Cart Total</h1>
                        <div className='space-y-1'>
                            <p className='flex items-center justify-between border-b pb-2 text-sm font-medium'>Sub Total:<span className='text-primaryRed'>₹{calculateTotalAmount()}</span></p>
                            <p className='flex items-center justify-between border-b pb-2 text-sm font-medium'>Shipping:<span className='text-primaryRed'>Free</span></p>
                            {
                                isCouponValid && <p className='flex items-center justify-between border-b pb-2 text-sm font-medium'>Coupon:<span className='text-primaryRed'>-₹{couponAmount}</span></p>
                            }
                            <p className='flex items-center justify-between border-b pb-2 text-sm font-medium'>Total:<span className='text-primaryRed'>₹{calculateDiscountAmount()}</span></p>
                        </div>
                        <Button variant="primary">Proceed to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
