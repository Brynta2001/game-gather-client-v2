import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next"
import { getCsrfToken } from "next-auth/react"
import "../../app/globals.css"
import Link from "next/link";
import Image from "next/image";
import FormTitle from "@/components/others/FormTitle";

// Defining a personalization for the sign in page
// uses csrfToken to protect against CSRF attacks
export default function SignIn({
    csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <div className='main'/>
            <div className='gradient' />
        <main className="app">
            <div className="items-center justify-between">
            <div className="mt-20">
                <Link href='/' className='flex gap-4 flex-center'>
                    <Image
                        src='/assets/images/logo.svg'
                        alt='logo'
                        width={80}
                        height={80}
                        className='object-contain'
                    />
                    <FormTitle title="Game Gather"></FormTitle>
                </Link>
            </div>
            <div className="items-center px-8 pt-6 pb-8 mb-4">                
                <form method="post" action="/api/auth/callback/credentials" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="mb-4">
                        <label className="block text-orange-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input maxLength={50} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" />
                    </div>
                    <div className="">
                        <label className="block text-orange-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input maxLength={50} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" />
                    
                    </div>
                    
                    <div className="text-center">
                        <button className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign in
                        </button>
                        <Link href="/signup" >
                        <p className="text-orange-700 hover:text-orange-900 text-center mb-2">Sign up</p>
                        </Link>
                    </div>
                    
                </form>
            </div>
        </div>
        </main>
        </div>

    )
}

// getServerSideProps function to get the csrfToken
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}