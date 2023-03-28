import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {joinIngredientsAndMeasures} from "../utils/recipe-formating";
import {getMealDetails} from "../services/recipe.service";
import ReactPlayer from "react-player";

function CookBookDetail() {
    const [showModal, setShowModal] = useState(false);
    const [recipe, setRecipe] = useState({
        strMealThumb: '',
        strArea: '',
        strMeal: '',
        strInstructions: '',
        strYoutube: ''
    });
    let {id} = useParams();


    useEffect(() => {
        getMealDetails(id).then(r => {
            console.log(r);
            setRecipe(r.meals[0]);
        });
    }, [])

    const replaceNewLine = (text: string) => {
        const items: string[] = [];
        text.split("\r\n").forEach((item) => {
                if (item) {
                    items.push(item);
                }
            }
        )
        return items;
    }

    // const joinIngredients = (items: any) => {
    //     return joinIngredientsAndMeasures(items);
    // }

    return (
        <div className={'md:p-16'}>
            <div className={'md:bg-gray-800 rounded-3xl md:p-10 min-h-[85vh] relative'}>
                <img
                    className={'w-72 h-72 rounded-full md:rounded-3xl object-cover border-2 md:absolute mx-auto mb-10  top-[-70px] right-[-70px]'}
                    src={recipe?.strMealThumb} alt={'chicken'}/>

                <div className={'flex gap-5'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>

                </div>

                <div className={'flex flex-col gap-5 pt-5'}>
                    <p className={'font-bold text-amber-500 border-l-2 px-2 border-l-amber-500'}>{recipe.strArea}</p>
                    <p className={'font-bold text-3xl md:text-5xl md:mr-52'}>{recipe.strMeal}</p>
                </div>

                <div>
                    <h3 className={'text-3xl my-5'}>Ingredients</h3>
                    <div className={'w-full overflow-scroll'}>
                        <div className={'flex w-fit gap-2 md:gap-5'}>
                            {joinIngredientsAndMeasures(recipe).plainIngredients?.map((item: any, index: number) => (
                                <Ingredients key={index}
                                             name={item}/>
                            ))}

                        </div>
                    </div>
                    <div className={'bg-gray-700 p-5 mt-5 rounded-3xl'}>
                        {joinIngredientsAndMeasures(recipe).ingredients?.map((item: any, index: number) => (
                            <p key={index}><span
                                className={'inline-block w-5 text-right mr-4'}>{index + 1 + '. '}</span>{item} </p>
                        ))}
                    </div>

                </div>

                <div>
                    <h3 className={'text-3xl my-5'}>Instructions</h3>
                    <div className={'grid md:grid-cols-2 gap-5'}>
                        <div className={'w-full'}>
                            {replaceNewLine(recipe.strInstructions).map((item: any, index) => (
                                <div className={'bg-gray-600 mb-4 rounded-lg  p-3 px-4 relative'} key={index}>
                                    <p className={'absolute bg-amber-500 h-full w-2 left-0 top-0 rounded-full flex items-center justify-center text-lg'}></p>
                                    <p className={''}>{item}</p>
                                </div>
                            ))}
                        </div>
                        {
                            showModal ?
                                (
                                    <div className={'w-full h-[500px] rounded-3xl overflow-hidden'}>
                                        <ReactPlayer url={recipe.strYoutube} controls={true} width={'100%'}
                                                     height={'100%'}/>
                                    </div>
                                ) :
                                // <div className={'flex items-center justify-center w-full h-[400px] grow '}>
                                //     <img
                                //         className={'w-[100%] h-[100%] object-cover rounded-3xl opacity-50 hover:opacity-80 '}
                                //         src={recipe?.strMealThumb} alt={'meal'}/>
                                //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                //          strokeWidth={1.5}
                                //          stroke="currentColor"
                                //          className="h-16 w-20 md:h-20 absolute cursor-pointer hover:text-amber-500">
                                //         <path strokeLinecap="round" strokeLinejoin="round"
                                //               d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                //         <path strokeLinecap="round" strokeLinejoin="round"
                                //               d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/>
                                //     </svg>
                                //     <p className={'absolute mt-32 md:text-2xl'}>Watch the Video</p>
                                // </div>
                                <div className={'w-full h-[500px] flex items-center justify-center'}>
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
            </div>
        </div>
    )

}

export default CookBookDetail;

function Ingredients(props: any) {
    return (
        <>
            <div
                className={'bg-gray-600 rounded-3xl p-5 w-32 text-center hover:bg-amber-500 cursor-pointer'}>
                <img className={'pb-5 h-24 max-w-full object-cover inline-block'}
                     src={'https://www.themealdb.com/images/ingredients/' + props.name + '.png'} alt={'Pork'}/>
                <p className={'font-bold text-sm'}>{props.name}</p>
            </div>
        </>
    )
}
