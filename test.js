<!-- <div class="row mt-5">
            <div class="col-md-3">&nbsp;</div>
            <div class="col-md-6">
                <% if (session.user_id) { %>
                    <h1>Hi User, Welcome</h1>
                    <a href="/logout" class="btn btn-primary">Logout</a>
                <% } else { %>
                    <div class="card">
                        <div class="card-header">Login</div>
                        <div class="card-body">
                            <form method="post" action="/login">
                                <div class="mb-3">
                                    <label>Email Address</label>
                                    <input type="email" name="email" class="form-control" required />
                                </div>
                                <div class="mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" class="form-control" required />
                                </div>
                                <div class="mb-3">
                                    <input type="submit" class="btn btn-primary" value="Login" />
                                </div>
                            </form>
                            <a href="/register" class="btn btn-secondary">Register</a>
                        </div>
                    </div>
                <% } %>
            </div>
        </div> -->