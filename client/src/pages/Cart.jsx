import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getCart } from '@/api/API'
import useAuth from '@/hooks/useAuth'
import useCart from '@/hooks/useCart'
import { Input } from '@/components/ui/input'


const Cart = () => {
    const { cartWithProduct: cart } = useCart()
    console.log(cart)
    return (
        <div>
            <div className='md:x-5 mt-4 space-y-2'>
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
                        {
                            cart?.map((item) => {
                                return <TableRow key={item.productId}>
                                    <TableCell className="font-medium">
                                        <div className='flex items-center gap-2'>
                                            <img src={import.meta.env.VITE_IMAGE_PATH + item?.productData?.attributes?.productImages?.data[0]?.attributes?.url} alt="product" className='h-[50px] w-[50px] object-cover' />
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
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            className="w-2/3 outline-none focus-visible:ring-0"
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{calculateSubtotal(item?.attributes?.price, quantities[item.id])}
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>


        </div>
    )
}

export default Cart