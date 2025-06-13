import React from 'react'
import styles from '@/styles/common/Footer.module.scss'
import Link from 'next/link';
import RightArrow from '@/public/assets/icons/rightArrow.svg'

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerLinksContainer}>
                <div>
                    <h2>Acount</h2>
                </div>
                <div>
                    <Link href="">Log In</Link>
                    <Link href="">Sign Up</Link>
                    <Link href="">Redeem a Gift Card</Link>
                </div>
            </div>
            <div className={styles.footerLinksContainer}>
                <div>
                    <h2>Company</h2>
                </div>
                <div>
                    <Link href="">About</Link>
                    <Link href="">Environmental Initiatives</Link>
                    <Link href="">Careers</Link>
                    <Link href="">International</Link>
                    <Link href="">Accessibility</Link>
                </div>
            </div>
            <div className={styles.footerLinksContainer}>
                <div>
                    <h2>Get Help</h2>
                </div>
                <div>
                    <Link href="">Help Center</Link>
                    <Link href="">Return Policy</Link>
                    <Link href="">Shipping Info</Link>
                    <Link href="">Corporate Orders</Link>
                </div>
            </div>
            <div className={styles.footerLinksContainer}>
                <div>
                    <h2>Connect</h2>
                </div>
                <div>
                    <Link href="">Facebook</Link>
                    <Link href="">Instagram</Link>
                    <Link href="">Twitter</Link>
                    <Link href="">Affiliates</Link>
                </div>
            </div>
            <div className={styles.footerInput}>
                <input type="text" placeholder='Email Address' />
                <button><RightArrow width={30} /></button>
            </div>
        </div >
    )
}

export default Footer;