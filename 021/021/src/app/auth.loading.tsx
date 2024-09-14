import Image from "next/image";

export const Loading = () =>{
    return (
        <main className="flex w-full h-full items-center bg-white">
            <Image
                src={"/logo.svg"}
                alt="logo"
                width={700}
                height={600}
                className="animate-pulse duration-700 m-auto"
            />
        </main>
    )
}