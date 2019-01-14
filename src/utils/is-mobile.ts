export default (): boolean => {
    if (typeof window !== 'undefined') {
        const type = document.body.getAttribute('data-machine');
        if (type === 'mobile') {
            return true;
        } else {
            return false;
        }
    }
    return false;
};