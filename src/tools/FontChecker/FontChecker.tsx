import { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import JSONPretty from 'react-json-pretty-newlines';
import './FontChecker.css'

declare global {
  function queryLocalFonts(): Promise<Array<FontData>>;
}

interface FontData {
  family: string, fullName: string, postscriptName: string, style: string
}

interface FontResult {
  value: string,
  label: string,
  info: FontData,
}

const getDealWithLocalFonts = (data: Array<FontData>): Array<FontResult> => {
  const result = new Map()

  data.forEach((item) => {
    const { family, fullName, postscriptName, style } = item

    const info = {
      family,
      fullName,
      postscriptName,
      style,
    }

    if (result.has(family)) {
      result.set(family, [...result.get(family), info])
    } else {
      result.set(family, [info])
    }
  })

  return [...result.entries()].map(([key, value]) => ({
    value: value[0].fullName,
    label: key,
    info: value,
  }))
}

const getLocalFontsAsync = () => window.queryLocalFonts().then(getDealWithLocalFonts)

const FontChecker = () => {
  const [options, setOptions] = useState<Array<FontResult>>([])
  const [selectedOption, setSelectedOption] = useState<SingleValue<FontResult>>()

  const openLocalFontsPermissions = () => {
    getLocalFontsAsync().then((data: Array<FontResult>) => {
      setOptions(data)
    })
  }

  const onChange = ((newValue: SingleValue<FontResult>) => {
    setSelectedOption(newValue)
  })

  useEffect(() => {
    console.log('选择的字体为：', selectedOption)
  }, [selectedOption])

  return (
    <main className='font-checker'>
      <div className="left">
        <p>
          请确保开启了 <a href="chrome://flags/#font-access">chrome://flags/#font-access</a>
          <button onClick={openLocalFontsPermissions}>获取本地字体列表</button>
        </p>

        <section>
          <Select defaultValue={selectedOption} onChange={onChange} options={options} />
          <div className="preview" style={{ fontFamily: selectedOption?.value }}>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((number) => {
              return (
                <div key={number} className={`weight-${number}`}>
                  这是一段 wight {number} 的测试文字，用来查看不同字体效果
                </div>
              )
            })}
          </div>
        </section>
        <div />
      </div>
      <aside>
        <h2>字体信息</h2>
        <JSONPretty data={selectedOption} />
      </aside>
    </main>
  )
}

export default FontChecker
