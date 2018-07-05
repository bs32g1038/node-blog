export function getFieldFromProps(field) {
    console.log(this.props.$store)
    return (this.props.$store && this.props.$store[field]) || []
}