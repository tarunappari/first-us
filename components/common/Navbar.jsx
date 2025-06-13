"use client";
import React from 'react'
import styles from '@/styles/common/Navbar.module.scss'
import Link from 'next/link';
import CartIcon from '@/public/assets/icons/cart.svg'
import SearchIcon from '@/public/assets/icons/search.svg'
import UserIcon from '@/public/assets/icons/user.svg'
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <div>
                <Link href="/" className={pathname === "/" ? styles.active : ""}>
                    Home
                </Link>
                <Link href="/shop" className={pathname === "/shop" ? styles.active : ""}>
                    Shop
                </Link>
                <Link href="/about" className={pathname === "/about" ? styles.active : ""}>
                    About
                </Link>
                <Link href="/blog" className={pathname === "/blog" ? styles.active : ""}>
                    Blog
                </Link>
            </div>
            <div className={styles.title}>
                Aranya
            </div>
            <div>
                <CartIcon width={30} />
                <SearchIcon width={30} />
                <UserIcon width={30} />
            </div>
        </div>
    )
}

export default Navbar;