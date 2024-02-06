import { categories } from "@/app/(lib)/services/categories";

type Props = {
    params: {
        slugs: [
            'categorySlug',
            'subcategorySlug'
        ]
    }
}

export default function Page({ params }: Props) {
    console.log(params);
}