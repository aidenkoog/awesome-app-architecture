import './HomeComponent.css'

export const HomeComponent = (props) => {

  const { message } = props

  return (
    <div>
      <h3>React Web Socket Module App</h3>
      <h5>message: {message}</h5>
    </div>
  )
}