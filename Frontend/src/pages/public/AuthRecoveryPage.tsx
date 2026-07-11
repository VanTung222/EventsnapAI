import { FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './AuthPages.css';

type RecoveryMode = 'forgot' | 'reset' | 'verify';
type PasswordFlowState = 'forgot' | 'sent' | 'reset' | 'token-error' | 'reset-success';
type VerifyState = 'loading' | 'success' | 'expired';

type AuthRecoveryPageProps = {
  mode: RecoveryMode;
};

const passwordStateLabels: Array<[PasswordFlowState, string]> = [
  ['forgot', 'Quên MK'],
  ['sent', 'Đã gửi'],
  ['reset', 'Đặt lại MK'],
  ['token-error', 'Token lỗi'],
  ['reset-success', 'Hoàn tất'],
];

const verifyStates: Array<[VerifyState, string]> = [
  ['loading', 'Loading'],
  ['success', 'Success'],
  ['expired', 'Expired'],
];

const AuthRecoveryPage = ({ mode }: AuthRecoveryPageProps) => {
  const [searchParams] = useSearchParams();
  const initialPasswordState: PasswordFlowState = mode === 'reset'
    ? searchParams.get('token') === 'invalid' ? 'token-error' : 'reset'
    : 'forgot';

  const [passwordState, setPasswordState] = useState<PasswordFlowState>(initialPasswordState);
  const [verifyState, setVerifyState] = useState<VerifyState>('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submitForgot = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordState('sent');
  };

  const submitReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Mật khẩu mới cần có ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setPasswordState('reset-success');
  };

  if (mode === 'verify') {
    return (
      <div className="auth-page verify-page">
        <main className="verify-grid" aria-label="Preview verify email states">
          <article className={`verify-card ${verifyState === 'loading' ? 'is-active' : ''}`}>
            <div className="verify-icon">
              <span className="verify-spinner" />
            </div>
            <h1 className="verify-title">Đang xác minh...</h1>
          </article>

          <article className={`verify-card ${verifyState === 'success' ? 'is-active' : ''}`}>
            <div className="verify-icon success">
              <span className="ms">verified</span>
            </div>
            <h1 className="verify-title">Xác minh email</h1>
            <p>Email đã được xác minh thành công.</p>
            <Link className="verify-button success" to="/login">Đăng nhập ngay</Link>
          </article>

          <article className={`verify-card ${verifyState === 'expired' ? 'is-active' : ''}`}>
            <div className="verify-icon warning">
              <span className="ms">error</span>
            </div>
            <h1 className="verify-title">Token hết hạn</h1>
            <p>Liên kết xác minh của bạn đã hết hạn.</p>
            <button className="verify-button warning" type="button">Gửi lại email xác minh</button>
          </article>
        </main>

        <nav className="verify-state-nav" aria-label="Preview state controls">
          <span>PREVIEW STATE</span>
          {verifyStates.map(([value, label]) => (
            <button className={verifyState === value ? 'active' : ''} key={value} onClick={() => setVerifyState(value)} type="button">{label}</button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="auth-page password-flow-page">
      <nav className="password-state-nav" aria-label="Preview password state">
        {passwordStateLabels.map(([value, label]) => (
          <button className={passwordState === value ? 'active' : ''} key={value} onClick={() => setPasswordState(value)} type="button">{label}</button>
        ))}
      </nav>

      <main className="password-card">
        <div className="password-hub-icon"><span className="ms">hub</span></div>

        {passwordState === 'forgot' && (
          <section>
            <h1>Quên mật khẩu?</h1>
            <p>Đừng lo lắng. Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.</p>
            <form className="password-form" onSubmit={submitForgot}>
              <div className="password-input-wrap">
                <span className="ms">mail</span>
                <input className="password-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" required type="email" />
              </div>
              <button className="es-primary-button" type="submit">
                <span>Gửi liên kết đặt lại</span>
                <span className="ms">arrow_forward</span>
              </button>
            </form>
            <Link className="password-back-link" to="/login"><span className="ms">arrow_back</span> Quay lại đăng nhập</Link>
          </section>
        )}

        {passwordState === 'sent' && (
          <section>
            <div className="password-status-icon soft"><span className="ms">mark_email_read</span></div>
            <h1>Kiểm tra hộp thư</h1>
            <p>Nếu email tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra cả thư mục Spam.</p>
            <button className="password-ghost-button" onClick={() => setPasswordState('forgot')} type="button">Chưa nhận được? Gửi lại</button>
            <Link className="password-back-link" to="/login"><span className="ms">arrow_back</span> Quay lại đăng nhập</Link>
          </section>
        )}

        {passwordState === 'reset' && (
          <section>
            <h1>Tạo mật khẩu mới</h1>
            <p>Vui lòng chọn một mật khẩu mạnh và an toàn.</p>
            <form className="password-form" onSubmit={submitReset}>
              <div className="password-input-wrap">
                <span className="ms">lock</span>
                <input className="password-input has-toggle" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mật khẩu mới" required type={showPassword ? 'text' : 'password'} />
                <button className="input-toggle" onClick={() => setShowPassword((value) => !value)} type="button"><span className="ms">{showPassword ? 'visibility_off' : 'visibility'}</span></button>
              </div>
              <div className="password-strength-mini">
                <div>
                  <i className="active" />
                  <i className="active" />
                  <i />
                  <i />
                </div>
                <span>Khá mạnh</span>
              </div>
              <div className="password-input-wrap">
                <span className="ms">lock_reset</span>
                <input className="password-input" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Xác nhận mật khẩu" required type="password" />
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="es-primary-button" type="submit">
                <span>Cập nhật mật khẩu</span>
                <span className="ms">check_circle</span>
              </button>
            </form>
          </section>
        )}

        {passwordState === 'token-error' && (
          <section>
            <div className="password-status-icon error"><span className="ms">gpp_bad</span></div>
            <h1 className="error">Token không hợp lệ</h1>
            <p>Liên kết đặt lại mật khẩu này đã hết hạn hoặc không tồn tại. Vui lòng yêu cầu một liên kết mới để tiếp tục.</p>
            <button className="es-primary-button" onClick={() => setPasswordState('forgot')} type="button">Yêu cầu link mới</button>
          </section>
        )}

        {passwordState === 'reset-success' && (
          <section>
            <div className="password-status-icon soft"><span className="ms">check_circle</span></div>
            <h1>Mật khẩu đã cập nhật</h1>
            <p>Tài khoản của bạn đã được bảo mật bằng mật khẩu mới. Bạn có thể đăng nhập ngay bây giờ.</p>
            <Link className="auth-link-button" to="/login"><span className="ms">login</span> Quay lại đăng nhập</Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default AuthRecoveryPage;