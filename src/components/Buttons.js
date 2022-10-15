export default function Buttons(props) {
    return (
        <a {...props}><button className='bg-[#f38590] border-[#f9c7cc] border-4 pointer text-white rounded-full font-[600] h-12 min-h-8 w-36 min-w-32 hover:bg-[#f9c7cc] ease-in duration-300'>
            {props.txt}
        </button></a>
    )
}