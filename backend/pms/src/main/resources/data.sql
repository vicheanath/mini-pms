INSERT INTO member(
                email,
                name,
                password,
                created_at,
                updated_at,
                status
        )
VALUES (
                'a@a.com',
                'Mr.A',
                '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                'ACTIVE'
        ),
        (
                'b@b.com',
                'Mr.B',
                '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                'ACTIVE'
        ),
        (
                'c@c.com',
                'Mr.C',
                '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                'ACTIVE'
        ),
        (
                'vnath@miu.edu',
                'Vishal Nath',
                '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                'ACTIVE'
        ),
        (
                'dengbunthai@gmail.com',
                'Bunthai',
                '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                'ACTIVE'
        );
INSERT INTO role(name, created_at, updated_at)
VALUES ('Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Owner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_role(member_id, role_id)
VALUES (1, 1),
        (2, 2),
        (3, 3),
        (4, 1);
INSERT INTO property (
                id,
                category,
                created_at,
                description,
                latitude,
                location,
                longitude,
                number_of_room,
                offer_status,
                price,
                status,
                sub_category,
                title,
                type,
                updated_at,
                owner_id
        )
VALUES (
                1,
                'House',
                '2024-02-07 00:29:48.576972',
                'Nestled in the woods you will find this completely transformed  4 bedroom 3 bathroom home on just over 2 acres',
                41.01594773977671,
                '2574 243rd St, Fairfield, IA 52556',
                -91.9687843322754,
                4,
                'AVAILABLE',
                399900,
                'ACTIVE',
                'Multi Family',
                'House for Sell in Iowa',
                'RENT',
                '2024-02-07 00:29:48.576972',
                3
        ),
        (
                2,
                'Land',
                '2024-02-07 00:44:43.55343',
                'Great Building Site Right off Hwy 34.  17.4 Acres Total, 11.34 Acres Tillable with Average CSR2 of 51.6 (4.6 Acres Currently in Cropland and 6.7 Acres in Hay).
',
                41.01303340479826,
                '17A Tamarack Ave, Fairfield, IA 52556
',
                -91.96608066558838,
                0,
                'AVAILABLE',
                156500,
                'ACTIVE',
                'Residential',
                'Great Building Site Right off Hwy 34',
                'RENT',
                '2024-02-07 00:44:43.55343',
                3
        ),
        (
                3,
                'House',
                '2024-02-07 01:04:03.030894',
                'Welcome to 301 West Madison Avenue, a charming house nestled in the heart of Fairfield, IA. This delightful property offers a comfortable and inviting living space',
                41.03449931565007,
                '301 W Madison Ave, Fairfield, IA 52556',
                -91.96273326873781,
                2,
                'AVAILABLE',
                1000,
                'ACTIVE',
                'Multi Family',
                '1,000',
                'RENT',
                '2024-02-07 01:04:03.030894',
                3
        );
INSERT INTO picture(
                id,
                created_at,
                key,
                name,
                size,
                updated_at,
                url,
                property_id
        )
VALUES (
                1,
                '2024-02-07 00:28:41.77546',
                '18ee8134-c056-4b62-ab9c-de5c5ed1a397',
                '2de25a4be7b35b4e5bdc85dd1b90dd0b-cc_ft_1536.webp',
                374928,
                '2024-02-07 00:29:48.620212',
                'http://localhost:8080/api/v1/files/18ee8134-c056-4b62-ab9c-de5c5ed1a397/download',
                1
        ),
        (
                7,
                '2024-02-07 00:37:40.770564',
                '7dbe103a-ef37-4d40-8514-8b1d305cadbc',
                'istockphoto-1223671392-612x612.webp',
                119848,
                '2024-02-07 00:37:40.770564',
                'http://localhost:8080/api/v1/files/7dbe103a-ef37-4d40-8514-8b1d305cadbc/download',
                NULL
        ),
        (
                14,
                '2024-02-07 00:39:46.315914',
                'cf9af819-c037-4a2f-9d0b-a5266752e1de',
                '70eae94aac25d652feec326f6c956677-cc_ft_768.webp',
                81462,
                '2024-02-07 00:39:46.315914',
                'http://localhost:8080/api/v1/files/cf9af819-c037-4a2f-9d0b-a5266752e1de/download',
                NULL
        ),
        (
                16,
                '2024-02-07 00:43:24.242007',
                '4ddaf5cb-d198-4c4f-bda3-166d0d1720e6',
                '36a3818de08b1276e999d6644b898bc7-cc_ft_768.webp',
                95240,
                '2024-02-07 00:44:43.638679',
                'http://localhost:8080/api/v1/files/4ddaf5cb-d198-4c4f-bda3-166d0d1720e6/download',
                2
        ),
        (
                4,
                '2024-02-07 00:28:41.77546',
                '255d0f6e-be87-4deb-a8d1-4640941c97e1',
                '681b80dd92692119ba9b5877582ff7b3-cc_ft_768.webp',
                133530,
                '2024-02-07 00:29:48.619834',
                'http://localhost:8080/api/v1/files/255d0f6e-be87-4deb-a8d1-4640941c97e1/download',
                1
        ),
        (
                3,
                '2024-02-07 00:28:41.775458',
                '216bde52-1811-4e57-a587-41bfc9cf00ab',
                'a4da493447946d23c7dafae95f171ece-cc_ft_768.webp',
                57856,
                '2024-02-07 00:29:48.62001',
                'http://localhost:8080/api/v1/files/216bde52-1811-4e57-a587-41bfc9cf00ab/download',
                1
        ),
        (
                2,
                '2024-02-07 00:28:41.775458',
                '3d56edd8-d846-498a-a7a0-86abf7f450b8',
                'f9f46aa3b70545cd8462c399dd3e4cb2-cc_ft_1536.webp',
                79694,
                '2024-02-07 00:29:48.620092',
                'http://localhost:8080/api/v1/files/3d56edd8-d846-498a-a7a0-86abf7f450b8/download',
                1
        ),
        (
                5,
                '2024-02-07 00:37:40.77056',
                'd940e58b-fea3-42c4-b8ad-ad0a6fd77d2a',
                '36a3818de08b1276e999d6644b898bc7-cc_ft_768.webp',
                95240,
                '2024-02-07 00:37:40.77056',
                'http://localhost:8080/api/v1/files/d940e58b-fea3-42c4-b8ad-ad0a6fd77d2a/download',
                NULL
        ),
        (
                8,
                '2024-02-07 00:37:40.770559',
                'ea5dd452-e0b9-4a5e-a47e-791a51b3f7c8',
                '70eae94aac25d652feec326f6c956677-cc_ft_768.webp',
                81462,
                '2024-02-07 00:37:40.770559',
                'http://localhost:8080/api/v1/files/ea5dd452-e0b9-4a5e-a47e-791a51b3f7c8/download',
                NULL
        ),
        (
                6,
                '2024-02-07 00:37:40.770563',
                'dfa22596-db7b-42ce-a421-95ddefbc9c9a',
                '1c0500ddb4a2c8237f1b05bf4f6b14f0-cc_ft_1536.webp',
                150908,
                '2024-02-07 00:37:40.770563',
                'http://localhost:8080/api/v1/files/dfa22596-db7b-42ce-a421-95ddefbc9c9a/download',
                NULL
        ),
        (
                9,
                '2024-02-07 00:37:40.788933',
                '52830c0e-246b-4b48-b6dc-0bda9a4444b8',
                'd64f5b44f3f1edca650d6847c696652d-cc_ft_768.webp',
                124432,
                '2024-02-07 00:37:40.788933',
                'http://localhost:8080/api/v1/files/52830c0e-246b-4b48-b6dc-0bda9a4444b8/download',
                NULL
        ),
        (
                11,
                '2024-02-07 00:39:46.315386',
                '591d9fa5-98e7-4a26-9feb-05e1d711e1bc',
                '36a3818de08b1276e999d6644b898bc7-cc_ft_768.webp',
                95240,
                '2024-02-07 00:39:46.315386',
                'http://localhost:8080/api/v1/files/591d9fa5-98e7-4a26-9feb-05e1d711e1bc/download',
                NULL
        ),
        (
                12,
                '2024-02-07 00:39:46.315794',
                'fa0f3c2e-83dd-40ed-8a57-151cdf8c7490',
                '1c0500ddb4a2c8237f1b05bf4f6b14f0-cc_ft_1536.webp',
                150908,
                '2024-02-07 00:39:46.315794',
                'http://localhost:8080/api/v1/files/fa0f3c2e-83dd-40ed-8a57-151cdf8c7490/download',
                NULL
        ),
        (
                10,
                '2024-02-07 00:39:46.315384',
                '48cf8e8a-31f9-45d4-8521-331d035ed6a9',
                'd64f5b44f3f1edca650d6847c696652d-cc_ft_768.webp',
                124432,
                '2024-02-07 00:39:46.315384',
                'http://localhost:8080/api/v1/files/48cf8e8a-31f9-45d4-8521-331d035ed6a9/download',
                NULL
        ),
        (
                13,
                '2024-02-07 00:39:46.315524',
                '7ec7814c-f1d4-40f3-8408-2c9b5ca475ce',
                'istockphoto-1223671392-612x612.webp',
                119848,
                '2024-02-07 00:39:46.315524',
                'http://localhost:8080/api/v1/files/7ec7814c-f1d4-40f3-8408-2c9b5ca475ce/download',
                NULL
        ),
        (
                17,
                '2024-02-07 00:43:24.242005',
                '20b85878-8ffd-442a-be27-e7b3d1dcc0f1',
                '1c0500ddb4a2c8237f1b05bf4f6b14f0-cc_ft_1536.webp',
                150908,
                '2024-02-07 00:44:43.638803',
                'http://localhost:8080/api/v1/files/20b85878-8ffd-442a-be27-e7b3d1dcc0f1/download',
                2
        ),
        (
                15,
                '2024-02-07 00:43:24.242007',
                'cb0ecd6f-0ff2-47e8-9a85-dca4b2d5a50f',
                'd64f5b44f3f1edca650d6847c696652d-cc_ft_768.webp',
                124432,
                '2024-02-07 00:44:43.638862',
                'http://localhost:8080/api/v1/files/cb0ecd6f-0ff2-47e8-9a85-dca4b2d5a50f/download',
                2
        ),
        (
                19,
                '2024-02-07 00:43:24.242007',
                '708d8753-0c03-4442-8ecd-15ef7ce229d6',
                '70eae94aac25d652feec326f6c956677-cc_ft_768.webp',
                81462,
                '2024-02-07 00:44:43.638934',
                'http://localhost:8080/api/v1/files/708d8753-0c03-4442-8ecd-15ef7ce229d6/download',
                2
        ),
        (
                18,
                '2024-02-07 00:43:24.242005',
                '5d4e5767-6ba6-49f4-8778-25314b25a7ad',
                'istockphoto-1223671392-612x612.webp',
                119848,
                '2024-02-07 00:44:43.638987',
                'http://localhost:8080/api/v1/files/5d4e5767-6ba6-49f4-8778-25314b25a7ad/download',
                2
        ),
        (
                20,
                '2024-02-07 01:03:47.210358',
                '0d832078-7c8c-4a93-bf2c-4f8c986d7bcc',
                '71d6d546e79e698652c862e7febb6c84-cc_ft_768.webp',
                104744,
                '2024-02-07 01:04:03.062579',
                'http://localhost:8080/api/v1/files/0d832078-7c8c-4a93-bf2c-4f8c986d7bcc/download',
                3
        ),
        (
                22,
                '2024-02-07 01:03:47.210358',
                '19e4d3b2-b4fe-4260-9082-30c0bbdc4bcd',
                '478163394364d24a5c9f5e514143a987-cc_ft_768.webp',
                47724,
                '2024-02-07 01:04:03.063409',
                'http://localhost:8080/api/v1/files/19e4d3b2-b4fe-4260-9082-30c0bbdc4bcd/download',
                3
        ),
        (
                21,
                '2024-02-07 01:03:47.210358',
                '26e2c78c-def2-4fc9-b34c-21c2eb8994ed',
                'ffde7376d106d8c16964fdd2be7b4bc6-cc_ft_768.webp',
                108156,
                '2024-02-07 01:04:03.063517',
                'http://localhost:8080/api/v1/files/26e2c78c-def2-4fc9-b34c-21c2eb8994ed/download',
                3
        );
INSERT INTO offer(
    id,
        created_at,
price,
remark,
status,
updated_at,
customer_id,
property_id
        )
VALUES (
                1,
                '2024-02-07 01:07:54.663563',
                100000,
                'Can i buy this land for 100000$',
                'PENDING',
                '2024-02-07 01:07:54.663563',
                3,
                2
        );