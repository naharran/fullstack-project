'use client'
import { useFormik } from "formik"
import { UserFormData } from "../../../../shared/types"
import axios from "axios"

export default function Signup () {

    const myForm = useFormik<UserFormData>({
        initialValues: {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
        },
        onSubmit: async(values: UserFormData) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, values)
            console.log(res);
        }
    })
    return   (
        <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up 
        </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={myForm.handleSubmit} className="space-y-6">
        <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    First name
                </label>
                <div className="mt-2">
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={myForm.handleChange}
                        value={myForm.values.firstName}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Last name
                </label>
                <div className="mt-2">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={myForm.handleChange}
                        value={myForm.values.lastName}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={myForm.handleChange}
                        value={myForm.values.email}
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={myForm.handleChange}
                        value={myForm.values.password}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    </div>
</div>
</>
)
}