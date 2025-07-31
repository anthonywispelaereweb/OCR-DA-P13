import { useGetProfileMutation, useUpdateProfileMutation } from '@/redux/features/profile/profileApi'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '@/redux/features/profile/profileSlice'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const dispatch = useDispatch()
  const [getProfile, { isLoading: profileLoading, error }] = useGetProfileMutation()
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation()
  const profileData = useSelector(state => state.profile)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if(isAuthenticated) {
          const result = await getProfile().unwrap()
          if (result?.body) {
            dispatch(
              setProfile({
                firstName: result.body.firstName,
                lastName: result.body.lastName,
                email: result.body.email
              }),
              setEditForm({
                firstName: result.body.firstName,
                lastName: result.body.lastName
              })
            )
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    }

    fetchProfile()
  }, [getProfile, dispatch, isAuthenticated])

  const handleUpdateProfile = async e => {
    e.preventDefault()
    try {
      if (profileData !== null) {
        await updateProfile({
          firstName: editForm.firstName,
          lastName: editForm.lastName
        }).unwrap()

        dispatch(
          setProfile({
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            email: profileData.email
          })
        )

        setIsEditing(false)
      } else {
        console.error('Profile data is null or undefined.')
      }
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (profileLoading || updateLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.toString()}</p>
  }

  return (
    <div className='header'>
      {!isEditing ? (
        <>
          <h1>
            Welcome back
            <p className='user-name'>
            {profileData?.firstName} {profileData?.lastName}!
            </p>
          </h1>
          <button className='edit-button' onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        </>
      ) : (
        <div className='edit-form'>
          <form onSubmit={handleUpdateProfile}>
            <div className='input-wrapper'>
              <label htmlFor='firstName'>First Name</label>
              <input type='text' id='firstName' name='firstName' value={editForm.firstName} onChange={handleInputChange} />
            </div>
            <div className='input-wrapper'>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text' id='lastName' name='lastName' value={editForm.lastName} onChange={handleInputChange} />
            </div>
            <div className='edit-buttons'>
              <button type='submit' className='edit-button'>
                Save
              </button>
              <button type='button' className='edit-button cancel' onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserProfile
