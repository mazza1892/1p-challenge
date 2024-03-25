// @ts-expect-error - import react based on eslint rules
import React from 'react';

function Header() {
    return (
        <div className="mt-10 mb-10">
            <h1 className="mb-10">1p Challenge</h1>

            <h2 className="text-3xl">Challenge Overview</h2>
            <p className="mt-10">
                The 1p Challenge is a way to save money by putting away a small
                amount each day. The ideas is that you will increase the amount
                you save by 1p each day. For example, on day 1 you save 1p, on
                day 2 you save 2p, on day 3 you save 3p and so on. By the end of
                the year you will have saved £667.95 (after 365 days).
            </p>

            <p className="mt-10 mb-10">
                This tool was inspired by the 1p Savings Challenge by the
                MoneySavingExpert (Martin Lewis) team. You can read more about
                it&nbsp;
                <a
                    href="https://www.moneysavingexpert.com/team-blog/2019/12/the-1p-365-day-savings-challenge/"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>
                .
            </p>

            <h2 className="text-3xl">Usage</h2>
            <p className="mt-10">
                You can use this tool to track your progress and see how much
                you have saved so far. You can also change the currency and view
                settings to suit your needs.
            </p>
            <p className="mt-10">
                The default settings for this tool is the traditional challenge,
                starting with 1p from January to December. There are a bunch of
                options for you to play with for example you can:
            </p>
            <ul className="list-disc">
                <li>
                    Change the currency (if you are from another country - other
                    than the UK)
                </li>
                <li>Change the start date to any date you like</li>
                <li>
                    Change the view to monthly, to see how much you save each
                    month
                </li>
                <li>Change the amount you save each day</li>
            </ul>
        </div>
    );
}

export default Header;
