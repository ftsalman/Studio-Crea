import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@utils/cn'
import { SERVICES } from '@constants/services'
import { sendContact } from '@services/contactService'
import Button from '@components/Button'
import './Contact.css'

const BUDGETS = ['< $5k', '$5k – 15k', '$15k – 40k', '$40k +']

function Field({ label, name, type = 'text', textarea, value, onChange, required }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className={cn('field', { 'is-filled': value })}>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
      />
      <span className="field__label">{label}</span>
      <span className="field__line" aria-hidden="true" />
    </label>
  )
}

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [interests, setInterests] = useState([])
  const [budget, setBudget] = useState('')
  const [status, setStatus] = useState('idle')

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const toggle = (key) =>
    setInterests((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await sendContact({ ...form, interests, budget })
      setStatus('sent')
      setForm({ name: '', email: '', company: '', message: '' })
      setInterests([])
      setBudget('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <fieldset className="cform__group">
        <legend>{t('contact.interest')}</legend>
        <div className="chips">
          {SERVICES.map((s) => (
            <button
              key={s.key}
              type="button"
              className={cn('chip', { 'is-active': interests.includes(s.key) })}
              aria-pressed={interests.includes(s.key)}
              onClick={() => toggle(s.key)}
            >
              {t(`services.${s.key}`)}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="cform__row">
        <Field label={t('contact.name')} name="name" value={form.name} onChange={set} required />
        <Field label={t('contact.email')} name="email" type="email" value={form.email} onChange={set} required />
      </div>
      <Field label={t('contact.company')} name="company" value={form.company} onChange={set} />
      <Field label={t('contact.message')} name="message" textarea value={form.message} onChange={set} required />

      <fieldset className="cform__group">
        <legend>{t('contact.budget')}</legend>
        <div className="chips">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              className={cn('chip', { 'is-active': budget === b })}
              aria-pressed={budget === b}
              onClick={() => setBudget(budget === b ? '' : b)}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="cform__submit">
        <Button type="submit" variant="red" size="lg" disabled={status === 'loading'}>
          {status === 'loading' ? t('contact.sending') : t('contact.send')}
        </Button>
        <p className={cn('cform__status', status)} role="status">
          {status === 'sent' && t('contact.sent')}
          {status === 'error' && t('contact.error')}
        </p>
      </div>
    </form>
  )
}
