type Props = {
    params: {
        slug: string,
    }
}
export default async function Page({ params: { slug } }: Props) {
    console.log(slug);
    return (
        <div>
            {slug}
        </div>
    )
}