import Feature from '@components/Feature'
import chatIcon from '@images/icon-chat.png'
import moneyIcon from '@images/icon-money.png'
import securityIcon from '@images/icon-security.png'

const Home = () => {
  const features = [
    {
      icon: chatIcon,
      title: 'You are our #1 priority',
      description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
    },
    {
      icon: moneyIcon,
      title: 'More savings means higher rates',
      description: 'The more you save with us, the higher your interest rate will be!'
    },
    {
      icon: securityIcon,
      title: 'Security you can trust',
      description: 'We use top of the line encryption to make sure your data and money is always safe.'
    }
  ]

  return (
    <main>
      <div className='hero'>
        <section className='hero-content'>
          <h2 className='sr-only'>Promoted Content</h2>
          <p className='subtitle'>No fees.</p>
          <p className='subtitle'>No minimum deposit.</p>
          <p className='subtitle'>High interest rates.</p>
          <p className='text'>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className='features'>
        <h2 className='sr-only'>Features</h2>
        {features.map((feature, index) => (
          <Feature key={index} icon={feature.icon} title={feature.title} description={feature.description} />
        ))}
      </section>
    </main>
  )
}

export default Home
