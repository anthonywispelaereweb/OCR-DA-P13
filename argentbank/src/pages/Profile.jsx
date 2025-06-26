import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Account from '@components/Account'
import UserProfile from '@components/UserProfile'

const Profile = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance'
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance'
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance'
    }
  ]

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <UserProfile />
      </div>

      <h2 className='sr-only'>Accounts</h2>

      {accounts.map((account, index) => (
        <Account key={index} title={account.title} amount={account.amount} description={account.description} />
      ))}
    </main>
  )
}

export default Profile
