import Head from "next/head"

interface MetaProps {
    title?: string;
    description?: string;
}

export default function Meta({
    title = "Schedulia", 
    description = "Track your anticipated upcoming media releases"
}: MetaProps) {
    return (
        <Head>
           <title>{title}</title>
           <meta charSet="utf-8"/>
           <meta name="author" content="KallumJ"/>
           <meta name="description" content={description}/>
        </Head>
    )
}
