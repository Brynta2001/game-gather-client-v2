import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next"
import { getCsrfToken } from "next-auth/react"
import "../../app/globals.css"
export default function SignIn({
    csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <form method="post" action="/api/auth/callback/credentials" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            
            <div className="mb-4">
                <label className="block text-orange-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" />
            </div>
            <div className="mb-6">
                <label className="block text-orange-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" />
            </div>
            <div className="flex items-center justify-between">
                <button className="primary-color hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign in
                </button>
            </div>
        </form>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
        csrfToken: await getCsrfToken(context),
        },
    }
}