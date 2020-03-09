import React from 'react'

const sleep = time => new Promise((resolve, err) => setTimeout(resolve, time))

const getUser = () => sleep(1000).then(() => ({username: 'elmo'}))
// .then(() => null)

export function PromiseMy({children}) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null,
  })

  React.useEffect(() => {
    getUser().then(
      user => setState({status: 'success', error: null, user}),
      error => setState({status: 'error', error, user: null}),
    )
  }, [])

  return (
	  <>
      {state.status === 'pending' ? (
        'Loading...'
		) 
		: 
		state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
		)
		:
		(
			<div>
            <pre>{state.status}</pre>
				{state.user.username}
				<div>
        			{/* {children} */}
				</div>
			</div>
      )}
		</>
  )
}
