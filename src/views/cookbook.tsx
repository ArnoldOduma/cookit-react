import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import {getMealCategories, getRecipes} from "../services/recipe.service";

function CookBook() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [state, setState] = useState({
        value: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        getMealCategories().then(r => {
            setIsLoaded(true);
            setCategories(r.categories);
        })
    }, [])

    useEffect(() => {
        getRecipes(' ').then(r => {
            setIsLoaded(true);
            setRecipes(r.meals);
        }).finally(() => {
            setIsLoaded(true)
        })
    }, [])

    useEffect(() => {
        const params = new URLSearchParams()
        if (state) {
            params.append("q", state.value)
        } else {
            params.delete("q")
        }
        // history.name({search: params.toString()})
        history('../cookbook?q=' + state.value)
    }, [state.value, history])

    function handleChange(event: any) {
        setState({value: event.target.value});
    }

    const handleKeypress = (e: any) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    function handleSubmit(event: any) {
        getRecipes(state.value).then(r => {
            setIsLoaded(true);
            setRecipes(r.meals);
        }).finally(() => {
            setIsLoaded(true)
        })
        event.preventDefault();
    }

    return (
        <div>
            <div>
                <div
                    className={'flex items-center overflow-hidden rounded-full bg-white lg:w-7/12 xl:w-6/12 p-1 text-black'}>
                    <input className={'h-10 px-5 grow focus:outline-0 font-bold text-lg'} placeholder={'Search ...'}
                           type={'text'} value={state.value} onChange={handleChange} onKeyUp={handleKeypress}/>
                    <button type={'submit'} onClick={handleSubmit}
                            className={'bg-amber-500 p-1 rounded-full h-10 w-10 flex items-center justify-center '}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </button>

                </div>


                <div>
                    <h3 className={'text-3xl my-5'}>Categories</h3>
                    <div className={'w-full overflow-scroll'}>
                        <div className={'flex w-fit gap-2 md:gap-5'}>
                            {categories?.map((item: any) => (
                                <Category
                                    key={item?.idCategory}
                                    name={item?.strCategory}
                                    image={item?.strCategoryThumb}
                                    click={() => {
                                        setShowModal(true);
                                        setModalContent(item);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className={'text-4xl my-5 font-bold'}>Recipes</h3>
                    <div className={'w-full h-full'}>
                        <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-5'}>
                            {recipes?.map((item: any) => (
                                <RecipeCard
                                    key={item?.idMeal}
                                    id={item?.idMeal}
                                    name={item?.strMeal}
                                    area={item?.strArea}
                                    thumb={item?.strMealThumb}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal ? (
                <Modal
                    modalContent={modalContent}
                    click={() => setShowModal(false)}
                />
            ) : null}

        </div>

    )

}

export default CookBook;


function Category(props: any) {
    return (
        <>
            <div onClick={props.click}
                 className={'bg-gray-600 rounded-3xl w-24 md:w-40 px-3 py-5 md:py-10 md:px-5 text-center hover:bg-amber-500 cursor-pointer hover:w-40'}>
                <img className={'pb-5 h-24 max-w-full object-cover'}
                     src={props.image} alt={'Pork'}/>
                <p className={'text-sm md:text-lg font-bold truncate'}>{props.name}</p>
            </div>
        </>
    )
}

function RecipeCard(props: any) {
    return (
        <>
            <Link to={props.id}>
                <div
                    className={'bg-gray-600 rounded-3xl md:min-h-[300px] hover:bg-amber-500 cursor-pointer overflow-hidden p-1 h-full'}>
                    <img className={'w-full md:h-[250px] object-cover rounded-3xl'}
                         src={props.thumb} alt={'Pork'}/>
                    <div
                        className={'p-3 md:p-5 bg-gray-500 bg-opacity-90 md:mx-2 mt-[-50px]  z-20 relative h-full rounded-3xl'}>
                        <p className={'font-bold text-amber-500 border-l-2 px-2 border-l-amber-500'}>{props.area}</p>
                        <p className={'font-bold md:text-xl'}>{props.name}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

function Modal(props: any) {
    return (
        <>
            <div className="fixed inset-0 z-30 overflow-y-auto w-full h-full">
                <div className="fixed inset-0 w-full h-full bg-black opacity-70 z-0" onClick={props.click}></div>

                {/*<div className={'relative w-full h-full flex items-center justify-center z-30'}>*/}
                <div className={'bg-gray-600 w-11/12 md:w-6/12 p-5 md:p-10 pb-0 rounded-3xl text-center relative mx-auto mt-[50%] md:mt-[20%]'}>
                    <img className={'inline-block h-32 relative top-[-100px]'}
                         src={props?.modalContent?.strCategoryThumb} alt={props.modalContent.name}/>

                    <p className={'text-amber-500 text-2xl font-bold uppercase top-[-90px] relative'}>{props?.modalContent?.strCategory}</p>
                    <p className={'block max-h-[50vh] overflow-scroll top-[-80px] relative'}>{props?.modalContent?.strCategoryDescription}
                    </p>
                </div>
                {/*</div>*/}

            </div>
        </>
    )
}
