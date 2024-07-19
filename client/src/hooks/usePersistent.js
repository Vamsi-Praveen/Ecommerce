const usePersistent = () => {
    const getPersistent = (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(`Error getting ${key} from localStorage`, error);
            return null;
        }
    };

    const setPersistent = ({ key, value }) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error setting ${key} in localStorage`, error);
        }
    };

    const clearPersistentItem = (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage`, error);
        }
    };

    const clearPersistent = () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage", error);
        }
    };

    return { getPersistent, setPersistent, clearPersistent, clearPersistentItem };
};

export default usePersistent;
