import React from 'react';

function About() {
    return (
        <div className={'flex justify-center'}>
            <div className={'flex flex-col justify-center md:items-center gap-10 md:w-8/12 md:bg-gray-700 md:p-10 md:py-16 rounded-3xl'}>
                <h3 className={'text-3xl font-bold'}>About Us</h3>
                <p>
                    Welcome to CookIt, a recipe application dedicated to helping you discover and share delicious
                    recipes with ease.
                </p>
                <p>
                    At CookIt, we believe that cooking should be a fun and enjoyable experience, whether you're a
                    seasoned chef or a beginner in the kitchen. That's why we've created a platform that makes it easy
                    to
                    find and save your favorite recipes, share them with friends and family, and discover new and
                    exciting
                    dishes from around the world.
                </p>
                <p>
                    Our team is passionate about food and technology, and we're dedicated to creating an application
                    that
                    helps you get the most out of your cooking experience. Whether you're looking for a quick and easy
                    weeknight dinner or an impressive meal to impress your guests, we've got you covered.
                </p>
                <p>
                    We're constantly working to improve and enhance our application, and we're always open to feedback
                    and
                    suggestions from our users. So if you have any ideas or suggestions for how we can make CookIt
                    even
                    better, please don't hesitate to get in touch.
                </p>
                <p>
                    Thank you for choosing CookIt, and we hope you enjoy using our application as much as we enjoyed
                    creating it.
                </p>
            </div>
        </div>
    )

}

export default About;
