export function handleOnFocus( 
    labelRef: React.RefObject<HTMLLabelElement>
  ) {
    if (labelRef.current?.htmlFor === "login") {
      labelRef.current!.style.transform = "translate(-5px, -15px)";
    } else {
      labelRef.current!.style.transform = "translate(-5px, -15px)";
    }
  }
export function handleOnBlur(
  labelRef: React.RefObject<HTMLLabelElement>,
  inputRef: React.RefObject<HTMLInputElement>
) {
  if (inputRef.current?.name === "login") {
    let inputText = inputRef.current.value;
    if (inputText.trim() != "") {
      return;
    }
    labelRef.current!.style.transform = "translate(0, 0)";
  } else {
    if (inputRef.current?.value != "") {
      return;
    }
    labelRef.current!.style.transform = "translate(0,0)";
  }
}