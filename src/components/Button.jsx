import './Button.css';


//If the user does not pass the prop, React will use this value.
export const Button = ({
  children, // text element inside the button
  variant = 'primary', // primary, secondary, ghost, danger- control style types
  size = 'md', // sm, md, lg - control size of the button
  onClick, //run function when button is click
  type = 'button', // button type: button, submit, reset
  disabled = false, // disable the button
  fullWidth = false,//button will take the full width of the container.
  icon = null,
  loading = false,
  className = '',

}) => {
  return (
    <button
      type={type}
      //dynamic class
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
   {/*  {condition ? (TRUE_PART) : (FALSE_PART)} */}

      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {/* {loading && <span className="btn-spinner" />} */}
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

/* export const button2 = () => {
  return ();
} */
