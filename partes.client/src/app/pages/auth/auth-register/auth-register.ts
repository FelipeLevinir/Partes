import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        RouterModule,
    ],
    template: `
        <section class="animate-fadein animate-duration-300 animate-ease-in relative lg:pb-14 lg:py-52 py-36">
            <div class="landing-container mx-auto relative z-10 px-12">
                <div class="relative mt-28 max-w-[46rem] mx-auto">
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[4deg] lg:rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] lg:-rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <form
                        class="space-y-8 p-8 relative z-10 bg-white/64 dark:bg-surface-800 backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)]"
                    >
                         
                        <div class="flex items-center gap-4">
                            <span class="h-px w-full bg-primary-500/10"></span>
                            <span class="text-surface-400 dark:text-surface-500">or</span>
                            <span class="h-px w-full bg-primary-500/10"></span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="username" class="font-medium text-surface-500 dark:text-white/64">User
                                Name</label>
                            <input name="username" pInputText id="username" [(ngModel)]="username" class="w-full"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-medium text-surface-500 dark:text-white/64">Email
                                Address</label>
                            <input name="email" pInputText id="email" [(ngModel)]="email" class="w-full"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password"
                                   class="font-medium text-surface-500 dark:text-white/64">Password</label>
                            <input name="password" pInputText id="password" type="password" [(ngModel)]="password" class="w-full"/>
                        </div>
                        <div class="flex items-center gap-2">
                            <p-checkbox name="remember" id="remember" [(ngModel)]="checkbox" binary/>
                            <label for="remember" class="text-surface-500 dark:text-white/64"><span
                                class="text-surface-950 dark:text-surface-0 font-medium">I have read the </span>Terms
                                and Conditions</label>
                        </div>
                        <button pButton class="w-full" rounded>Register</button>
                        <div class="flex items-center justify-center gap-2">
                            <span class="text-surface-500 dark:text-white/64">Already have an account?</span>
                            <a routerLink="/landing/login" class="text-primary">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class Register {
    username = '';

    email = '';

    password = '';

    checkbox = false;
}
