
export function Avatar({ name, size }: { name: string, size: { h: number, w: number } }) {
    return (
        <button>
            <div className={`relative inline-flex items-center justify-center w-${size.w} h-${size.h} overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600`}>
                <span className="text-lg font-extralight text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
            </div>
        </button>
    )

}