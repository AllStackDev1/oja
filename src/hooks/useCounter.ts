import { useState, useEffect } from 'react'

const useCounter = (mounted: boolean, initial: number): number => {
  const [counter, setCounter] = useState<number>(initial)

  useEffect(() => {
    if (mounted) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    } else {
      setCounter(initial)
    }
  }, [counter, mounted])

  return counter
}

export default useCounter
