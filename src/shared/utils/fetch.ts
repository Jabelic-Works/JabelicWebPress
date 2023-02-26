
type Options = {
    method?: "GET"|"POST"|"UPDATE",
    headers?: {
        [key in string]: string
    },
    params?: {
        [key in string]: string
    },
    body?: string
}

export const _fetch = async<T>(url: string, options?: Options): Promise<T>=>{
    const res = await fetch(url, options).then<T>(res => res.json());
    return res
}

// // in-source test suites
// if (import.meta.vitest) {
//     const { it, expect } = import.meta.vitest
//     const symbol = "amzn";
//     const url = "https://financialmodelingprep.com/api/company/real-time-price/" + symbol + "?datatype=json";
//     it('add', async() => {
//         const fn = await _fetch(url)
//         expect(fn).toBeCalled()
//         expect(fn).toBeCalledTimes(1)
//     })
// }


// export function add(...args: number[]) {
// return args.reduce((a, b) => a + b, 0)
// }

// // in-source test suites
// if (import.meta.vitest) {
// const { it, expect } = import.meta.vitest
// it('add', () => {
//     expect(add()).toBe(0)
//     expect(add(1)).toBe(1)
//     expect(add(1, 2, 3)).toBe(6)
// })
// }
