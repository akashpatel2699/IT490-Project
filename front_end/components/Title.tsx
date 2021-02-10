import React from 'react';
import Head from "next/head";

interface TitleProp{
    title: String,
}

const Title = ({ title } : TitleProp) => {
    return (
        <>
           <Head>
                <title>{title}</title>   
            </Head> 
        </>
    )
}

export default Title
