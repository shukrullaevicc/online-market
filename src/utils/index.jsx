const Button = ({children,btnType,loading}) => {
   return(
      <button className="form-btn" disabled={loading} type={btnType}>{loading ? "Loading..." : children}</button>
   )
}

export default Button