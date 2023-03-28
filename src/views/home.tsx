import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getRandomMeal} from "../services/recipe.service";
import {joinIngredientsAndMeasures} from "../utils/recipe-formating";
import ReactPlayer from "react-player";

function Home() {
    // const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [recipe, setRecipe] = useState({
        strMealThumb: '',
        strArea: '',
        strMeal: '',
        idMeal: '',
        strYoutube: ''
    });

    const sendRequest = useCallback(async () => {
        if (isLoading) return
        setIsLoading(true)
        await getRandomMeal().then(r => {
            setIsLoading(false);
            setRecipe(r.meals[0]);
        })
        setIsLoading(false)
        setShowModal(false);
    }, [isLoading]);

    useEffect(() => {
        getRandomMeal().then(r => {
            setIsLoading(false);
            setRecipe(r.meals[0]);
        })
        // sendRequest().then();
    }, [])

    return (
        <div>
            <div className={'flex flex-wrap justify-between overflow-hidden relative min-h-[90vh]'}>
                <div className={'hidden md:block absolute flex items-center justify-center w-[100%] h-[100%]'}>
                    <img
                        className={'w-[100%] h-[100%] object-cover rounded-3xl opacity-30 z-[0]'}
                        src={recipe.strMealThumb} alt={'meal'}/>
                </div>

                <div
                    className={'flex flex-wrap flex-col w-full items-center md:items-start md:w-6/12 py-10 md:p-10 gap-10 z-20'}>
                    <div className={'bg-gray-200 w-full h-2 rounded-full'}></div>
                    <div className={'text-2xl  z-20 w-full'}>
                        <h3>We Suggest</h3>
                        <h4 className={'text-5xl md:text-7xl my-3 font-extrabold normal-case'}>{recipe.strMeal}</h4>
                        <p className={'font-bold text-amber-500 border-l-2 px-2 border-l-amber-500'}>{recipe.strArea}</p>
                    </div>
                    <button
                        className={'md:hidden w-full border text-white rounded-full p-2 px-5 hover:bg-amber-500 hover:border-amber-500 active:bg-red-500'}
                        disabled={isLoading}
                        onClick={sendRequest}>Craving for something else ?
                    </button>

                    <div className={'flex items-center justify-center w-full h-[300px] md:h-[200] grow '}>

                        {
                            showModal ?
                                (
                                    <div className={'w-full h-full rounded-3xl overflow-hidden'}>
                                        <ReactPlayer url={recipe.strYoutube} controls={true} width={'100%'} height={'100%'}/>
                                    </div>
                                ) :
                                <div className={'w-full h-full flex items-center justify-center'}>
                                    <img
                                        className={'w-[100%] h-[100%] object-cover rounded-3xl hover:opacity-80 '}
                                        src={recipe.strMealThumb} alt={'meal'}/>
                                    <div
                                        className={'absolute bg-red-500 px-5 py-2 rounded-xl cursor-pointer hover:text-red-500 hover:bg-white'}
                                        onClick={() => setShowModal(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/>
                                        </svg>
                                    </div>

                                    <p className={'absolute mt-32 md:text-2xl bg-black bg-opacity-50'}>Watch the
                                        Video</p>
                                </div>
                        }

                    </div>


                </div>


                <div className={'w-full md:w-5/12 relative overflow-hidden md:p-10 md:border md:rounded-3xl'}>
                    <div className={' bg-opacity-80 rounded-3xl w-full relative z-20'}>
                        <h3 className={'uppercase text-3xl md:text-right pb-5'}>You will need</h3>
                        <hr className={'px-2'}/>
                        <ul className={'md:text-right py-5'}>
                            {joinIngredientsAndMeasures(recipe).plainIngredients?.map((item: any, index: any) => (
                                <li className={'normal-case'} key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={'flex flex-col flex-wrap md:items-end gap-5 py-5'}>
                        <Link to={'../cookbook/' + recipe.idMeal}>
                            <button
                                className={'bg-white text-black rounded-full p-2 px-5 w-full md:w-fit hover:bg-amber-500'}>Lets
                                Cook
                            </button>
                        </Link>
                        <button
                            className={'border text-white rounded-full p-2 px-5 hover:bg-amber-500 hover:border-amber-500'}
                            disabled={isLoading}
                            onClick={sendRequest}>Craving for something else ?
                        </button>
                    </div>


                </div>
            </div>

        </div>
    )

}

export default Home;
