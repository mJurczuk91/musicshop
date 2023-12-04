export default function Card({ children }: { children: React.ReactNode[] }) {
    return <div className="bg-white p-4 m-4 shadow-md">
        {children}
    </div>
}