import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "./buttons/SignInButton";

const AppBar = () => {
  return (
    <header className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Game Gather</p>
      </Link>
      <SignInButton />
    </header>
  )
}

export default AppBar