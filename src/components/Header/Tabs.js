import { useState } from 'react'
import styles from './index.module.scss'

export default function Tabs(props) {
  const { tabs, handleClickTab } = props
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  function handleClick(tab) {
    setActiveTab(tab.value)
    handleClickTab(tab)
  }

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => {
        return (
          <a key={tab.value} className={activeTab === tab.value && styles.active} onClick={() => handleClick(tab)}>
            {tab.label}
          </a>
        )
      })}
    </div>
  )
}
