import Image from 'next/image';
import './Framer.css';
const Framer = () => {
    return (
        <div className='framer-container'>
            <Image src="/Framer-img.png" alt="Framer Image" width={500} height={500} className='framer-image' />
        </div>

    )
}

export default Framer;