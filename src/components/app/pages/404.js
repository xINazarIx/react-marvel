import { Link } from "react-router-dom"
import ErrorMessage from "../../Common/errorMessage/ErrorMessage"


const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <Link to="/">Назад</Link>
    </div>
  )
}

export default Page404