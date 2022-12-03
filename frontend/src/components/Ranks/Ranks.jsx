
const Ranks = ( { user }) => {
  return (
    <div>
      <div className='center white f3'>
        {`${user.name}, You have scanned`}
      </div>
      <div className='center white f1'>
        {`${user.entries} images`}
      </div>
    </div>
  )
}

export default Ranks