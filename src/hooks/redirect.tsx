import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRedirectAfterSomeSeconds(redirectTo: string, seconds:number) {
    const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);
    const [start, setStart] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (start){
            const timer = setTimeout(() => {
                setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
                if (secondsRemaining === 1) router.push(redirectTo);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [start, router, secondsRemaining, redirectTo]);

    return { secondsRemaining, setStart };
}
