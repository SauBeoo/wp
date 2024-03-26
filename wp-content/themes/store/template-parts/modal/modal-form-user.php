<div class="modal fade" id="accountModal" style="display: none;">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-3 col-md-3">
                        <div class="modalLogo">
                            <a href="https://lamluy.vn">
                                <img src="https://file.hstatic.net/200000272403/file/wwebsitelogo_300x83px_948745d6afd84a86a4429fb9be236b28.jpg"
                                     alt="Lamluy" class="img-fluid logoimg">
                            </a>
                        </div>
                        <div class="nav flex-column nav-pills" id="v-pills-tab">
                            <a class="nav-link active" id="modalLoginTab" data-toggle="pill" href="#modalLogin"
                               role="tab" aria-controls="modalLogin">Đăng nhập</a>
                            <a class="nav-link" id="modalForgetTab" data-toggle="pill" href="#modalForget" role="tab"
                               aria-controls="modalForget">Quên mật khẩu</a>
                            <a class="nav-link" id="modalRegisterTab" data-toggle="pill" href="#modalRegister"
                               role="tab" aria-controls="modalRegister">Đăng ký</a>
                        </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="modalLogin" role="tabpanel"
                                 aria-labelledby="modalLoginTab">
                                <h5 class="text-center">
                                    ĐĂNG NHẬP
                                </h5>
                                <div class="login-form-body">
                                    <form accept-charset="UTF-8" action="/account/login" id="customer_login"
                                          method="post">
                                        <input name="form_type" type="hidden" value="customer_login">
                                        <input name="utf8" type="hidden" value="✓">


                                        <div class="form-group">
                                            <label for="login-email">Email*</label>
                                            <input type="email" id="login-email" class="form-control"
                                                   name="customer[email]" required="">
                                        </div>
                                        <div class="form-group">
                                            <label for="login-password">Mật khẩu*</label>
                                            <input type="password" id="login-password" class="form-control"
                                                   name="customer[password]" required="">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary">
                                                ĐĂNG NHẬP
                                            </button>
                                        </div>

                                        <input id="d8e0b0cb496644ebbc1ee3083627a590" name="g-recaptcha-response"
                                               type="hidden"
                                               value="03AFcWeA7Yna27fXFe8RIcJbOZC8UOyvwRh0-C2-GBsvFD6FQgS1MvrjTzRG3DgvIraDZAMU9jyAthDAbHVbYyXwiJ4OolCamEkZfclQMMC9gHw9ykBjVUroUuSzDc4GBaX58rZpzM8xfdDqmMzjUyuoxhP_addrPYMEnwge2ESH_rvQOxkp3136h7I7N0ZH0B8lQNKBgdiXwWnNTuPcUGf1RrvzeqKQzFrjTdD9kjhS-1AFqvOghKZAJyVIJWSRSnuQoWd5s_buGL1BmtNh7kxvqXOpCSYv2eMt__JBQ8ASo7-QNFpV8tDFz3HHsUcPahLJde88I4KvkSBstipelfuZfv3FIrdr7AXUaPRuMfZTEsJQwYfCZ7zRVbNHXxBzXWa97f1MhhmesK1RrnfaHutDNhvNtzOnn6t6sRnbwa1HYNHPDdzqgZKswsE6pVQN4kS1ie-dQqOoKUAghqqgk6v9A3zbnL6u4LGXzZxBaJq8e1kRdPxvEMm8zJ239AuJskXAwJG4oXsby2o-t65cCrrChBu0mc4kH5Yea2wLlClLs64vSRsQ4GfjuCW6iaM7Ywu_uj9JWa8W3ltYWoGWEWVRZJh-36dw-vXhVFdsmmK25UOV_VNpEaFLEZnkoQa3XMpOv-42SLfOw81FBX7B9JNK8tgF6iE2zb_A">
                                        <noscript
                                                data-src="https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-"></noscript>
                                        <noscript>
                                            grecaptcha.ready(function()
                                            {grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {action:
                                            'submit'}).then(function(token)
                                            {document.getElementById('d8e0b0cb496644ebbc1ee3083627a590').value =
                                            token;});});
                                        </noscript>
                                    </form>

                                </div>
                            </div>
                            <div class="tab-pane fade" id="modalForget">
                                <h5 class="text-center">
                                    QUÊN MẬT KHẨU
                                </h5>
                                <div class="recover-form-body">
                                    <form accept-charset="UTF-8" action="/account/recover" method="post">
                                        <input name="form_type" type="hidden" value="recover_customer_password">
                                        <input name="utf8" type="hidden" value="✓">


                                        <div class="form-group">
                                            <label for="recover-email">Email*</label>
                                            <input type="email" id="recover-email" class="form-control" name="email"
                                                   required="">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary">
                                                Gửi
                                            </button>
                                        </div>

                                        <input id="882e71e875b24b74b6383f79020ec9d2" name="g-recaptcha-response"
                                               type="hidden"
                                               value="03AFcWeA5r3NvRl0mNEBQIakbs8_eO3O6pjHlLiYAb3bRiPmzDh9R-mZbwTaIIBdOOE01UEinjfLfpVLOP9jGSWuNvH2acc9RZelVgWTXMzojVPqGNk0GTPhhqgqvV6MaXm8rDdfJM-akoOTpX9RgVEf12h946w7cWebWcuaqn6W4FHsl5mFYlWDbWKdrDydWAEp8nvTdXVimj6TCAX3HbnKkM84CE2hqtmGka37enP-lXyRuVqDZsyOqheWNoDMdWiKSwMr1k8kb_em3JkJGO7Po1kiW72uOcOEPQLKkLIkDReCo5F_i44JlW0iqE_ih_98w8Ji3LKZNNWmh-dbDHnG_L28UMARMGDlBARjZIk-f3LwnFw--bU3Uhc-8cEB8ujwExknjN3OqGONgRpmL_Plx6M_2LKiLZ_tH3Kfm9KDOj7kczcIF7Pp40ax9D1kZVB584WjCbZi6pMOB1GybgCTDFKCZej4XM1BAgfP0JU2q6typ-oBOW8SDneE3UrN1F9_L104uFWNO5bRHIb_yAa6Ky0U87NGA7FHHsHKSFywqzTMZS7EdlwgZaMDtuf6PFBFyd7q1hrLmbBTomAnbqukHFaWVYSSj1CsReQFA3BGDJ4R94EZ9Qq1suxG3ybNkzwEBG0sp5i2hQPgDYC-BX6EtYorYi369knQ">
                                        <noscript
                                                data-src="https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-"></noscript>
                                        <noscript>
                                            grecaptcha.ready(function()
                                            {grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {action:
                                            'submit'}).then(function(token)
                                            {document.getElementById('882e71e875b24b74b6383f79020ec9d2').value =
                                            token;});});
                                        </noscript>
                                    </form>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="modalRegister">
                                <h5 class="text-center">
                                    ĐĂNG KÝ
                                </h5>
                                <div class="register-form-body">
                                    <form accept-charset="UTF-8" action="/account" id="create_customer" method="post">
                                        <input name="form_type" type="hidden" value="create_customer">
                                        <input name="utf8" type="hidden" value="✓">
                                        <div class="form-group">
                                            <label for="register-last-name">Họ của bạn*</label>
                                            <input type="text" id="register-last-name" class="form-control"
                                                   name="customer[last_name]" required="">
                                        </div>
                                        <div class="form-group">
                                            <label for="register-first-name">Tên của bạn*</label>
                                            <input type="text" id="register-first-name" class="form-control"
                                                   name="customer[first_name]" required="">
                                        </div>
                                        <div class="form-group">
                                            <label for="register-phone">Số điện thoại</label>
                                            <input type="text" id="register-phone" class="form-control"
                                                   name="customer[phone]" pattern="^\+?\d{0,10}">
                                        </div>
                                        <div class="form-group">
                                            <label>Giới tính</label>
                                            <div class="row">
                                                <div class="col-2">
                                                    <input type="radio" id="register-gender-0" value="0"
                                                           name="customer[gender]" checked="">
                                                    <label for="register-gender-0">Nữ</label>
                                                </div>
                                                <div class="col-2">
                                                    <input type="radio" id="register-gender-1" value="1"
                                                           name="customer[gender]">
                                                    <label for="register-gender-1">Nam</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="register-email">Email*</label>
                                            <input type="email" id="register-email" class="form-control"
                                                   name="customer[email]" required="">
                                        </div>
                                        <div class="form-group">
                                            <label for="register-password">Mật khẩu*</label>
                                            <input type="password" id="register-password" class="form-control"
                                                   name="customer[password]" required="">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary">
                                                ĐĂNG KÝ
                                            </button>
                                        </div>
                                        <input id="8c280c41df9a43d8a95e9d8591e8b3ec" name="g-recaptcha-response"
                                               type="hidden"
                                               value="HFdW1rZhRNFG5hXl1eW0dPWgAoDCRqdyoqfAtyNQ0ZD2wXLDcpIn42FhNyMTZCflwuaBIOHEIDER4RIRREYx4vayFIKGocA2B4C0ogIE5XbFFLTTlzT2cKdhMDEh4PBm8PDy5oaGpgWXIldjlOEG93e2p-Lj0_cW9VXUpjcRMqBBg">
                                        <noscript
                                                data-src="https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-"></noscript>
                                        <noscript>
                                            grecaptcha.ready(function()
                                            {grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {action:
                                            'submit'}).then(function(token)
                                            {document.getElementById('8c280c41df9a43d8a95e9d8591e8b3ec').value =
                                            token;});});
                                        </noscript>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="javascript:void(0);" class="closeModal"><i class="lni lni-close"></i></a>
        </div>
    </div>
</div>