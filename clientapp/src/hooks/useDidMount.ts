import { useEffect, useRef } from "react"

export function useDidMount() {
	const mountRef = useRef(false);
	useEffect(() => { 
		mountRef.current = true 
	}, []);
  
	return mountRef.current;
  }