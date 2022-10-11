export default function Buttons(props) {
    return <button className="m-2" style={{backgroundColor:'#f38590', border:'5px solid #f9c7cc', borderRadius:'9999rem', cursor:'pointer', color:'white', fontWeight:'600', fontSize:'1em', paddingInline:'1.5em', minHeight:'3rem', minWidth:'10rem'}}>{props.txt}</button>
}