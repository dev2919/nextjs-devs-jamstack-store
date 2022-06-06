import React from 'react'
import {getInfoPage, getInfoPageByTitle} from '../../adapters/sanity'
import ReactMarkdown from 'react-markdown'

export default function InfoPage({info}) {

    console.log(info[0].InfoPage);

    return (
        <div className="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <article class="prose prose-slate mx-auto lg:prose-lg">
                <ReactMarkdown children={info[0].InfoPage} />
            </article>
        </div>
    )
}

export async function getStaticPaths() {
    const info = await getInfoPage()

    let paths = info.map(item => {
        const info = String(item.slug.current)

        return {params: {
                info
            }}
    })

    console.log(paths);

    return {paths, fallback: false}

}

export async function getStaticProps({params}) {
    const info = await getInfoPageByTitle(params.info)
    return {props: {
            info
        }}

}