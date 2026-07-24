import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eventHeroImage from '../../assets/images/register.webp';
import { authService, type AuthResponse } from '../../services/authService';
import { useAuthStore } from '../../stores/authStore';
import './AuthPages.css';

type AuthMode = 'login' | 'register';

type AuthAccessPageProps = {
  mode: AuthMode;
};

const AuthAccessPage = ({ mode }: AuthAccessPageProps) => {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password) && /[a-z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return checks.filter(Boolean).length;
  }, [password]);

  const strengthClass = strength <= 1 ? 'weak' : strength === 2 ? 'medium' : strength === 3 ? 'good' : 'strong';

  const getErrorMessage = (caughtError: unknown) => {
    const maybeError = caughtError as { response?: { data?: { message?: string } } };
    return maybeError.response?.data?.message ?? 'Không thể kết nối máy chủ. Vui lòng thử lại.';
  };

  const handleAuthSuccess = (data: AuthResponse) => {
    loginToStore({ token: data.accessToken, user: data.user });
    navigate(data.redirectPath, { replace: true });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isRegister) {
      if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
        setError('Vui lòng nhập đầy đủ thông tin đăng ký.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        return;
      }

      if (strength < 4) {
        setError('Mật khẩu chưa đạt đủ điều kiện bảo mật.');
        return;
      }

      if (!accepted) {
        setError('Vui lòng đồng ý điều khoản sử dụng và chính sách bảo mật.');
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await authService.register({ name: fullName, email, password, role: 'attendee' });
        handleAuthSuccess(response.data);
      } catch (caughtError) {
        setError(getErrorMessage(caughtError));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.login({ email, password });
      handleAuthSuccess(response.data);
    } catch (caughtError) {
      setError(getErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setError('Google Sign-In cần id_token từ Google Identity Services. Backend /api/auth/google đã sẵn sàng để nhận id_token.');
  };

  return (
    <div className="auth-page auth-fit-page">
      <main className="auth-shell auth-unified-shell">
        <aside className="auth-visual-panel" aria-label="Không gian sự kiện EventSnap AI">
          <img className="auth-visual-image" src={eventHeroImage} alt="Không gian sự kiện công nghệ với AI" />
          <Link className="auth-visual-brand" to="/">
            <span className="ms">event_upcoming</span>
            <span>EventSnap AI</span>
          </Link>
          <div className="auth-visual-copy">
            <h1>{isRegister ? 'Tổ chức sự kiện thông minh hơn.' : 'Quản lý sự kiện thông minh hơn với AI.'}</h1>
            <p>Tham gia hệ sinh thái quản lý sự kiện được tăng cường bởi AI, kết nối cộng đồng và tạo ra trải nghiệm đáng nhớ.</p>
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-wrap">
            {!isSuccess ? (
              <>
                <div className="auth-form-title">
                  <div className="auth-bolt"><span className="ms">bolt</span></div>
                  <h1>{isRegister ? 'Tạo tài khoản' : 'Chào mừng trở lại'}</h1>
                  <p>{isRegister ? 'Bắt đầu hành trình quản lý sự kiện của bạn ngay hôm nay.' : 'Đăng nhập vào EventSnap AI'}</p>
                </div>

                <section className="auth-access-card es-glass-panel">
                  <div className="auth-mode-switch" aria-label="Chuyển chế độ đăng nhập đăng ký">
                    <Link className={!isRegister ? 'active' : ''} to="/auth/login">Đăng nhập</Link>
                    <Link className={isRegister ? 'active' : ''} to="/auth/register">Đăng ký</Link>
                  </div>

                  <form className="auth-access-form" onSubmit={handleSubmit} noValidate>
                    {isRegister && (
                      <div>
                        <label className="es-label" htmlFor="register-name">Họ và tên</label>
                        <input className="register-input" id="register-name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Nguyễn Văn A" required type="text" />
                      </div>
                    )}

                    <div>
                      <label className="es-label" htmlFor="auth-email">Email</label>
                      <div className={isRegister ? undefined : 'es-input-wrap'}>
                        {!isRegister && <span className="ms">mail</span>}
                        <input className={isRegister ? 'register-input' : 'es-input'} id="auth-email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={isRegister ? 'name@company.com' : 'nhap@email.com'} required type="email" />
                      </div>
                    </div>

                    <div>
                      <label className="es-label" htmlFor="auth-password">Mật khẩu</label>
                      <div className={isRegister ? 'register-password-wrap' : 'es-input-wrap'}>
                        {!isRegister && <span className="ms">lock</span>}
                        <input className={isRegister ? 'register-input' : 'es-input has-toggle'} id="auth-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isRegister ? 'Tạo mật khẩu mạnh' : '••••••••'} required type={showPassword ? 'text' : 'password'} />
                        <button className="input-toggle" type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Hiện hoặc ẩn mật khẩu">
                          <span className="ms">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>

                      {isRegister && (
                        <div className="strength-bars" aria-label="Độ mạnh mật khẩu">
                          {Array.from({ length: 4 }).map((_, index) => (
                            <span className={index < strength ? `active ${strengthClass}` : ''} key={index} />
                          ))}
                        </div>
                      )}
                    </div>

                    {isRegister ? (
                      <>
                        <div>
                          <label className="es-label" htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
                          <div className="register-password-wrap">
                            <input className="register-input" id="register-confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Nhập lại mật khẩu" required type={showConfirmPassword ? 'text' : 'password'} />
                            <button className="input-toggle" type="button" onClick={() => setShowConfirmPassword((value) => !value)} aria-label="Hiện hoặc ẩn mật khẩu xác nhận">
                              <span className="ms">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                          </div>
                        </div>

                        <label className="register-terms compact-terms">
                          <input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} required type="checkbox" />
                          <span>Tôi đồng ý với <a className="auth-inline-link" href="#terms">điều khoản</a> và <a className="auth-inline-link" href="#privacy">chính sách bảo mật</a>.</span>
                        </label>
                      </>
                    ) : (
                      <div className="es-options-row">
                        <label className="es-check-label"><input type="checkbox" /> Ghi nhớ đăng nhập</label>
                        <Link className="es-forgot-link" to="/auth/forgot-password">Quên mật khẩu?</Link>
                      </div>
                    )}

                    {error && <p className="form-error" role="alert">{error}</p>}

                    <div className="es-actions compact-actions">
                      <button className="es-primary-button" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <span className="mini-spinner" /> : null}
                        <span>{isSubmitting ? (isRegister ? 'Đang đăng ký...' : 'Đang đăng nhập...') : isRegister ? 'Đăng ký' : 'Đăng nhập'}</span>
                        {!isSubmitting && <span className="ms">arrow_forward</span>}
                      </button>
                      <div className="es-divider"><span>hoặc</span></div>
                      <button className="es-secondary-button" type="button" onClick={handleGoogleLogin}><span className="ms">account_circle</span><span>{isRegister ? 'Đăng ký bằng Google' : 'Đăng nhập với Google'}</span></button>
                    </div>
                  </form>

                  <p className="auth-footer-text compact-footer">
                    {isRegister ? 'Đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
                    <Link to={isRegister ? '/auth/login' : '/auth/register'}>{isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}</Link>
                  </p>
                </section>
              </>
            ) : (
              <section className="auth-access-card register-success es-glass-panel">
                <div className="success-email-icon"><span className="ms">mark_email_read</span></div>
                <div className="register-title">
                  <h1>Kiểm tra Email</h1>
                  <p>Chúng tôi đã gửi một liên kết xác nhận đến email của bạn. Vui lòng nhấn vào liên kết để hoàn tất đăng ký.</p>
                </div>
                <Link className="es-secondary-button" to="/">Trở lại trang chủ</Link>
              </section>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthAccessPage;
