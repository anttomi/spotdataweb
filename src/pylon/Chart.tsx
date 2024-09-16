export default function Chart({ data }: { data: { headers: string[], values: number[]} }): JSX.Element {


    const max = Math.max(...data.values)

    return (
        <>
        </>
    )
}