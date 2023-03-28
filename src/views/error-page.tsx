import {useNavigate, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    return (
        <div className={'bg-black text-amber-50 min-h-screen flex justify-center items-center'}>
            <div id="error-page" className={'flex flex-wrap flex-col gap-5 md:w-8/12 p-5 text-center'}>
                <h1 className={'text-4xl md:text-5xl text-amber-500 '}>Oops!! Something went wrong in the kitchen 🧑‍🍳🙊👨‍🍳🔥</h1>
                <p>Looks like our chefs got a little too excited and burned the servers 🥵🔥🍴</p>
                <p className={'text-3xl'}>The page you are looking for was not found.</p>
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>
                <button className={'bg-amber-500 p-3 rounded'} onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
}
