export default function CurrencySymbol(props: {size?: number}) {
  const { size = 14 } = props;
  return (
    <span className="flex items-center [&_svg]:size-auto"><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12.53 14"><path fill="currentColor" d="M7.8 12.4c-.22.5-.37 1.03-.43 1.6l4.73-1.01c.22-.5.37-1.03.43-1.6L7.8 12.4ZM12.1 9.98c.22-.5.37-1.03.43-1.6l-3.68.78V7.65l3.26-.69c.22-.5.37-1.03.43-1.6l-3.68.78V.74c-.56.32-1.07.74-1.47 1.24v4.49l-1.47.31V0c-.56.32-1.07.74-1.47 1.24V7.1l-3.3.7C.93 8.3.78 8.83.72 9.4l3.73-.79v1.9l-3.99.85c-.22.5-.37 1.03-.43 1.6l4.18-.89c.34-.07.63-.27.82-.55l.77-1.14c.08-.12.13-.26.13-.41V8.3l1.47-.31V11l4.73-1.01Z"/></svg></span>
  )
}