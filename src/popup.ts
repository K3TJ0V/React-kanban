interface arguments{
    type: string,
    message: string,
    popupRef: React.RefObject<HTMLElement>,
    setPopupText: React.Dispatch<React.SetStateAction<string>>
}

export function popup({type, message, popupRef, setPopupText} : arguments){
    if(type === 'error'){
      popupRef.current!.style.backgroundColor = 'rgb(250, 91, 91)';
      popupRef.current!.style.boxShadow = 'inset 0 -2px 0 3px rgb(183, 66, 66)';
    }else if(type === 'succes'){
      popupRef.current!.style.backgroundColor = 'rgb(26, 171, 0)';
      popupRef.current!.style.boxShadow = 'inset 0 -2px 0 3px rgb(20, 124, 1)';
    }
    setPopupText(message)
    popupRef.current!.style.transform = 'translate(-50%, 0)';
    setTimeout(()=>{popupRef.current!.style.transform = 'translate(-50%, -500%)'}, 4000)
}

 