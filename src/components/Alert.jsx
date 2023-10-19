function Alert(props) {
    const style = {
      padding: '0.4rem',
      borderRadius: '4px',
      backgroundColor: 'rgb(248, 215, 218,0.3)',
      color: '#721c24',
      border: '1px solid #f5c6cb',
      marginBottom:'0.2rem'
    };
  
    return (
      <div className="alert-danger" style={style}>
        {props.children}
      </div>
    );
  }
  
  export default Alert;